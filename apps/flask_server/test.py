import cv2
import numpy as np
import pytesseract
from pytesseract import Output
from skimage.morphology import skeletonize

def classify_text_image_with_tesseract(image_path, debug=False):
    img = cv2.imread(image_path)
    if img is None:  # Added check for image load failure
        if debug:
            print(f"Error: Unable to load image '{image_path}'.")
        return "unknown", 0, 0
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    custom_config = r'--oem 3 --psm 6'
    ocr_data = pytesseract.image_to_data(thresh, config=custom_config, output_type=Output.DICT)
    num_boxes = len(ocr_data['level'])
    solidity_list = []
    stroke_width_list = []
    areas = []
    for i in range(num_boxes):
        if ocr_data['text'][i].strip() == "":
            continue
        x = ocr_data['left'][i]
        y = ocr_data['top'][i]
        w = ocr_data['width'][i]
        h = ocr_data['height'][i]
        if w * h < 30:
            continue
        areas.append(w * h)
        roi = thresh[y:y+h, x:x+w]
        contours, _ = cv2.findContours(roi.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        region_solidity = []
        for cnt in contours:
            area = cv2.contourArea(cnt)
            hull = cv2.convexHull(cnt)
            hull_area = cv2.contourArea(hull)
            if hull_area > 0:
                region_solidity.append(area / hull_area)
        if region_solidity:
            solidity_list.append(np.mean(region_solidity))
        roi_bool = roi > 0
        skeleton = skeletonize(roi_bool).astype(np.uint8) * 255
        dist_transform = cv2.distanceTransform(roi, cv2.DIST_L2, 3)
        skeleton_distances = dist_transform[skeleton == 255]
        if len(skeleton_distances) > 0:
            stroke_width_list.append(2 * np.mean(skeleton_distances))
    if len(solidity_list) == 0 or len(stroke_width_list) == 0:
        if debug:
            print("No valid text regions detected.")
        return "unknown", 0, 0
    solidity_std = np.std(solidity_list)
    stroke_width_std = np.std(stroke_width_list)
    
    # New edge density measure using Canny edge detector
    edges = cv2.Canny(gray, 100, 200)
    edge_density = np.count_nonzero(edges) / (gray.shape[0] * gray.shape[1])
    if debug:
        print(f"Edge Density: {edge_density:.2f}")
    
    # Define thresholds for the new combined heuristic
    solidity_threshold = 0.15
    stroke_width_threshold = 1.2
    edge_density_threshold = 0.15  # Adjust based on experiments
    
    # If edge density is high, favor digital text classification
    if edge_density > edge_density_threshold:
        classification = "digital"
    else:
        classification = "digital" if (solidity_std < solidity_threshold and stroke_width_std < stroke_width_threshold) else "handwritten"
    
    return classification, round(float(stroke_width_std), 2), round(float(solidity_std), 2)

if __name__ == "__main__":
    image_path = "./digital/digital_0045.jpg"  # Adjust path as needed
    classification, stroke, solidity = classify_text_image_with_tesseract(image_path, debug=True)
    print(f"Image: {image_path}")
    print(f"Classification: {classification}")
    print(f"Stroke Width STD: {stroke}")
    print(f"Solidity STD: {solidity}")



