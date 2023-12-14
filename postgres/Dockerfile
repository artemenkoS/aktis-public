FROM postgres:16

RUN  apt-get update && apt-get install -y cron supervisor
COPY backup.sh /usr/local/bin/backup_script.sh
RUN chmod +x /usr/local/bin/backup_script.sh
COPY crontab /etc/cron.d/backup-cron
RUN chmod 0644 /etc/cron.d/backup-cron
RUN crontab /etc/cron.d/backup-cron
RUN touch /var/log/cron.log

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord", "-n"]
