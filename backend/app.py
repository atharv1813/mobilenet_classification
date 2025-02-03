from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import models, transforms
import json
import io

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load labels safely
try:
    with open("imagenet_labels.json", "r") as f:
        labels = json.load(f)
except Exception as e:
    print(f"Error loading labels: {str(e)}")
    labels = {}

# Load MobileNet model
try:
    model = models.mobilenet_v2(pretrained=True)
    model.eval()
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

# Define image transformations
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Convert image to tensor
        img = Image.open(io.BytesIO(file.read()))
        img_tensor = transform(img).unsqueeze(0)

        # Perform prediction
        if model:
            with torch.no_grad():
                outputs = model(img_tensor)
                _, predicted_idx = torch.max(outputs, 1)
            
            predicted_label = labels.get(str(predicted_idx.item()), 'Unknown Label')
            confidence = torch.nn.functional.softmax(outputs, dim=1)[0][predicted_idx.item()].item()
        else:
            return jsonify({'error': 'Model not loaded properly'}), 500

        return jsonify({'label': predicted_label, 'confidence': confidence})
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
