# Докеризация и делой сервиса КупиПодариДай

Учебный проект Яндекс.Практикума

## Описание сервиса КупиПодариДай

Сервис КупиПодариДай представляет собой площадку, на которой пользователи могут показать свои желания (подарки, которые они хотят получить), а также участвовать в сборе денежных средств на приобретение подарков по желаниям других пользователей.

## Цели учебного проекта

В данной работе студент должен был на практике применить полученные теоретические знания по формированию изолированных модулей web-приложения. При этом было необходимо создать docker-образы, разместить их на сервере, организовать их взаимодействие, обеспечить автоматизации данного процесса. Формирование docker-образов, согласно требованиям проекта, осуществлялось в два этапа для того, чтобы исключить в итоговых образах неиспользуемые в рабочей версии приложения dev-зависимости, сократить размеры образов.Обеспечена возможность обращения к приложению по https-протоколу. По окончании работы у студента должны были сформироваться практические навыки докеризации web-приложения и его деплоя в таком виде на сервер.

Для реализации проекта студенту следовало использовать код клиентской части web-приложения, предоставленный Яндекс.Практикумом, а также разработанный студентом в рамках прошлого учебного проекта код северной части web-приложения (репозиторий [здесь](https://github.com/rainbowpieeee/kupipodariday-backend)).

### Использованные технологии

Docker, Docker Compose, Nginx

### Используемые команды для запуска приложения

Первоначально необходимо склонировать репозиторий на сервер. В дальнейшем web-приложение разворачивается одной командой:

- `git clone https://github.com/rainbowpieeee/kupipodariday-backend.git` – клонирование репозитория приложения;
- `cd kupipodariday-backend` – переход в корневую папку с клонированным приложения;
- `docker-compose up -d` – запуск формирования docker-образов, запуск docker-контейнеров и организация сетей между ними в автоматическом порядке в фоновом режиме. Frontend доступен на порту 8081. Backend доступен на порту 4000.

Для остановки приложения используется команда `docker-compose down` .

### Размещение проекта:

IP: 84.201.154.63

Frontend: (https://kupoda.ple.nomoredomains.monster)

Backend: (https://api.kupoda.les.nomoredomains.monster)