# MobileNet Image Classification

This project is a web application that allows users to upload images and receive classifications based on the MobileNetV2 model. The application is built with a Flask backend and a React frontend styled with Tailwind CSS.

## Features

- **Image Upload**: Users can upload images for classification.
- **Real-time Predictions**: The app provides immediate predictions with confidence scores.
- **Pre-trained Model**: Utilizes MobileNetV2, a lightweight convolutional neural network designed for efficient performance on mobile and embedded devices.

## Project Structure

```
mobilenet_classification/
├── backend/
│   ├── app.py               # Flask application with prediction endpoint
│   ├── imagenet_labels.json # JSON file mapping ImageNet class indices to human-readable labels
│   ├── requirements.txt     # Python dependencies
│   ├── static/              # Static files (if any)
│   └── templates/           # HTML templates (if any)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── index.css        # Tailwind CSS styles
│   │   └── components/      # Additional React components
│   ├── public/              # Public assets
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # Tailwind CSS configuration
│
├── images/                  # Folder containing sample output images
└── README.md                # Project documentation
```

## Setup Instructions

### Backend Setup

#### Prerequisites

- Python 3.8 or higher
- Virtual environment (recommended)

#### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/atharv1813/mobilenet_classification.git
   cd mobilenet_classification/backend
   ```

2. **Create and Activate Virtual Environment**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask Application**:

   ```bash
   python app.py
   ```

   The backend server will start at `http://127.0.0.1:5000/`.

### Frontend Setup

#### Prerequisites

- Node.js 16 or higher
- npm (Node Package Manager)

#### Installation

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the React Application**:

   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:5173/`.

## Usage

1. **Upload an Image**: Use the frontend interface to select and upload an image.
2. **View Prediction**: After uploading, the application will display the predicted label along with the confidence score.

## API Endpoint

### `POST /predict`

Endpoint to submit an image for classification.

- **Request**:
  - Method: `POST`
  - Content-Type: `multipart/form-data`
  - Form Data:
    - `file`: The image file to be classified.

- **Response**:
  - Success (HTTP 200):
    ```json
    {
      "label": "Golden Retriever",
      "confidence": 0.95
    }
    ```
  - Error (HTTP 400 or 500):
    ```json
    {
      "error": "Error message detailing the issue"
    }
    ```

## Sample Output

Sample classification results can be found in the `images/` directory.

## Technologies Used

- **Backend**: Flask, PyTorch, Pillow
- **Frontend**: React (Vite), Tailwind CSS
- **Model**: MobileNetV2 pre-trained on ImageNet

## Future Enhancements

- **Deployment**: Host the application on a cloud platform for wider accessibility.
- **Batch Processing**: Allow users to upload and classify multiple images simultaneously.
- **Model Options**: Provide users with the ability to choose from different pre-trained models for classification.
- **Enhanced UI/UX**: Improve the user interface with advanced styling and interactive features.

---

*Note: This project is for educational purposes and demonstrates the integration of a machine learning model within a web application framework.* 
