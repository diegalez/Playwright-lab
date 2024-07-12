FROM jenkins/jenkins:lts-jdk17

USER root
RUN curl -SSL https://get.docker.com/ | sh
USER jenkins