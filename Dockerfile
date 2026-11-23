FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt* ./
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

COPY governor.py main.py journal.py watchdog.py config.example.yaml ./
COPY deriv/ ./deriv/
COPY telegram/ ./telegram/
COPY sim/ ./sim/

CMD ["python", "main.py", "--dry-run", "--config", "/app/config.yaml"]
