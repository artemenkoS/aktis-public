Для запуска в режиме разработки:
```docker-compose -f docker-compose.dev.yml up --build```

Для бекапа БД:
```
docker exec -it containerID bash
/usr/local/bin/backup_script.sh
```

Для восстановления БД из бекапа:
```
docker exec -it aktis-postgres-1 bash
```

```
psql -U postgres -d postgres -c "CREATE DATABASE aktis_patients" 2> /dev/null || true

psql -U postgres -d aktis_patients -f /backups/backup-20231210214247.sql
```

Для запуска в production режиме:
```
docker-compose up --build
```
