FROM ubuntu:utopic

RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y supervisor
RUN apt-get install -y python-dev
RUN apt-get install -y python-pip

COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY docker_configs /

RUN ln -s /etc/nginx/sites-available/stressed /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default
# Interactive nginx via supervisord.
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80
CMD /usr/bin/supervisord
