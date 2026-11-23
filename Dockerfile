FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt* ./
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

COPY governor.py config.example.yaml ./

CMD ["python", "governor.py"]
