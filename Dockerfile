FROM ubuntu:utopic

# Install server reqs.
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y supervisor
RUN apt-get install -y python-dev
RUN apt-get install -y python-pip
RUN apt-get install -y curl

# Add code & python deps.
COPY . /opt/stressed/
RUN pip install -r /opt/stressed/requirements.txt

# Install node.
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Build js.
RUN cd /opt/stressed/static && npm install
RUN cd /opt/stressed/static && npm run-script build

# Set up necessary server configs.
COPY docker_configs /

# Enable site in nginx.
RUN ln -s /etc/nginx/sites-available/stressed /etc/nginx/sites-enabled/
RUN rm /etc/nginx/sites-enabled/default
# Interactive nginx via supervisord.
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Go!
EXPOSE 80
CMD /usr/bin/supervisord

