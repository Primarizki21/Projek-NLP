FROM 3.8.20

# Ini bukan dari gcp nya, tapi yang ngeset kita sendiri
WORKDIR /app

# ini buat ngecopy isi nya semuanya folder dan file
COPY . ./

# Install semua library dan dependency
RUN pip install -r requirements.txt

# Ini biar port nya kebuka
EXPOSE 8080

# Ngerun di command promt jadi deh
CMD ["python", "app.py"]
