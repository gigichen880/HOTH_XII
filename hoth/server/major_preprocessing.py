import re

input_file = "major.txt" 
output_file = "cleaned_file.txt"

with open(input_file, "r", encoding="utf-8") as infile, open(output_file, "w", encoding="utf-8") as outfile:
    for line in infile:
        cleaned_line = line.split("(")[0].strip().replace(" ", "_")  # Remove "(...)" and replace spaces with "_"
        outfile.write(cleaned_line + "\n")

print("Processing complete! Cleaned file saved as", output_file)
