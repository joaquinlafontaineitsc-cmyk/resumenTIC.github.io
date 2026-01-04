import pandas as pd
import json

def excel_to_json(excel_file, output_file=None):
    """
    Convert an Excel file to JSON format.
    
    Args:
        excel_file (str): Path to the Excel file
        output_file (str): Optional path to save the JSON file
    
    Returns:
        str: JSON string
    """
    # Read Excel file
    df = pd.read_excel(excel_file)
    
    # Convert to JSON
    json_data = df.to_json(orient='records', indent=2)
    #CAMVIAR EL ENCODE A UTF-8 SI HAY PROBLEMAS CON LOS ACENTOS
    json_data = json.dumps(json.loads(json_data), ensure_ascii=False, indent=2)


    # Save to file if output_file is specified
    if output_file:
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(json_data)
        print(f"JSON saved to {output_file}")
    
    return json_data

# Example usage
if __name__ == "__main__":
    # Replace with your Excel file path
    excel_path = "C:/Users/lafon/OneDrive/Documentos/mETA_PRODUCTO.xlsx"
    json_path = "C:/Users/lafon/OneDrive/Documentos/ITSC/resumenTIC/mETA_PRODUCTO.json"
    
    json_output = excel_to_json(excel_path, json_path)
    print(json_output)