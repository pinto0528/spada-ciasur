import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    # Leer el archivo CSV y convertirlo a una lista de diccionarios
    with open(csv_file_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        data = [row for row in csv_reader]
    
    # Escribir la lista de diccionarios en un archivo JSON
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, default=str)

# Ruta del archivo CSV
csv_file_path = 'records_test.csv'

# Ruta donde se guardará el archivo JSON
json_file_path = 'records.json'

csv_to_json(csv_file_path, json_file_path)
