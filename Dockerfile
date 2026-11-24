FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN groupadd -g 1000 softpip && \
    useradd -u 1000 -g softpip -m -s /bin/bash softpip

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=softpip:softpip governor.py main.py journal.py watchdog.py config.example.yaml ./
COPY --chown=softpip:softpip deriv/ ./deriv/
COPY --chown=softpip:softpip telegram/ ./telegram/
COPY --chown=softpip:softpip sim/ ./sim/

RUN mkdir -p /app/data && chown -R softpip:softpip /app

USER softpip

CMD ["python", "main.py", "--dry-run", "--config", "config.example.yaml"]
