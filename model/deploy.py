import json
import sagemaker
import boto3
from sagemaker.huggingface import HuggingFaceModel, get_huggingface_llm_image_uri

# Set the region for boto3 session explicitly
boto3.setup_default_session(region_name='us-east-1')  # Set your preferred region here

# Use the execution role ARN from your SageMaker setup
role = 'arn:aws:iam::471112549858:role/service-role/AmazonSageMaker-ExecutionRole-20241005T142258'

# Hub Model configuration: specify the Hugging Face model ID and the number of GPUs to use
hub = {
    'HF_MODEL_ID': 'flax-community/t5-recipe-generation',
    'SM_NUM_GPUS': json.dumps(1)
}

# Create Hugging Face Model class using the appropriate image URI for Hugging Face models
huggingface_model = HuggingFaceModel(
    image_uri=get_huggingface_llm_image_uri("huggingface", version="2.2.0"),
    env=hub,
    role=role,  # Using the role ARN directly
)

# Deploy model to SageMaker Inference
predictor = huggingface_model.deploy(
    initial_instance_count=1,
    instance_type="ml.g5.2xlarge",  # You can change this based on your needs
    container_startup_health_check_timeout=300,
)

# Send a prediction request
response = predictor.predict({
    "inputs": "provolone cheese, bacon, bread, ginger"
})

# Print the generated recipe response
print(response)