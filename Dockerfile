FROM ubuntu:14.04

# Install server reqs.
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y supervisor
RUN apt-get install -y python-dev
RUN apt-get install -y python-pip
RUN apt-get install -y curl
RUN apt-get install -y vim

# Add code & python deps.
COPY . /opt/mood-meter/
RUN pip install -r /opt/mood-meter/requirements.txt

# Install node.
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Build js.
RUN cd /opt/mood-meter/static && npm install
RUN cd /opt/mood-meter/static && npm run-script build

# Set up necessary server configs.
COPY docker_configs /

# Enable site in nginx.
RUN ln -s /etc/nginx/sites-available/mood /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default
# Interactive nginx via supervisord.
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Go!
EXPOSE 80
CMD /usr/bin/supervisord
