FROM python:3.9-slim

WORKDIR /app

COPY mock_server.py requirements.txt /app/

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
  && pip install fastapi uvicorn
COPY mock-data-* /app/

EXPOSE 8001

CMD ["uvicorn", "mock_server:app", "--host", "0.0.0.0", "--port", "8001"]
