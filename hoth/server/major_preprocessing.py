import re

# Read the file
with open("major.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

# Process each line
cleaned_lines = [re.sub(r"\).*", ")", line) for line in lines]

# Write back to a new file or overwrite the original
with open("cleaned_file.txt", "w", encoding="utf-8") as file:
    file.writelines(cleaned_lines)
