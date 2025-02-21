FROM python:3.9 AS base

# Install dependencies
RUN \
  --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt,sharing=locked \
  apt-get update \
  && apt-get --no-install-recommends install -y libmariadb-dev cron

ENV PYTHONPATH=/usr/src


# Set the working directory
WORKDIR /usr/src
# Copy the requirements file and install dependencies
COPY ./requirements.txt /usr/src/requirements.txt

# Copy the Python script
COPY ./crap_fetcher.py /usr/src/crap_fetcher.py 

COPY ./tests /usr/src/tests

RUN pip install --no-cache-dir --upgrade -r /usr/src/requirements.txt
# Copy the start-cron.sh script
COPY ./startcron.sh /usr/local/bin/startcron.sh
COPY cronjob /etc/cron.d/cronjob


# Run the start-cron.sh script

FROM base AS integration

CMD ["sh", "-c", "pytest -s tests/crap_fetcher_tests.py"]

FROM base AS integration-run

CMD ["python3", "crap_fetcher.py"]

FROM base AS development
# Give execution rights to the start-cron.sh script
RUN touch /var/log/cron.log \
  && touch /var/log/cron.error.log \
  && chmod 666 /var/log/cron.log \
  && chmod 666 /var/log/cron.error.log \
  && chmod +x /usr/local/bin/startcron.sh \
  && chmod 644 /etc/cron.d/cronjob \
  && crontab /etc/cron.d/cronjob

CMD ["/bin/bash", "/usr/local/bin/startcron.sh"]