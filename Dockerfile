<<<<<<< HEAD
FROM ubuntu:14.04
=======
FROM ubuntu:utopic
>>>>>>> a246be034873584e93e14f33fd910655d58fab21

# Install server reqs.
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y supervisor
RUN apt-get install -y python-dev
RUN apt-get install -y python-pip
RUN apt-get install -y curl
<<<<<<< HEAD
RUN apt-get install -y vim

# Add code & python deps.
COPY . /opt/mood-meter/
RUN pip install -r /opt/mood-meter/requirements.txt
=======

# Add code & python deps.
COPY . /opt/stressed/
RUN pip install -r /opt/stressed/requirements.txt
>>>>>>> a246be034873584e93e14f33fd910655d58fab21

# Install node.
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Build js.
<<<<<<< HEAD
RUN cd /opt/mood-meter/static && npm install
RUN cd /opt/mood-meter/static && npm run-script build
=======
RUN cd /opt/stressed/static && npm install
RUN cd /opt/stressed/static && npm run-script build
>>>>>>> a246be034873584e93e14f33fd910655d58fab21

# Set up necessary server configs.
COPY docker_configs /

# Enable site in nginx.
<<<<<<< HEAD
RUN ln -s /etc/nginx/sites-available/mood /etc/nginx/sites-enabled/
=======
RUN ln -s /etc/nginx/sites-available/stressed /etc/nginx/sites-enabled/
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
RUN rm /etc/nginx/sites-enabled/default
# Interactive nginx via supervisord.
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Go!
EXPOSE 80
CMD /usr/bin/supervisord
<<<<<<< HEAD
=======

>>>>>>> a246be034873584e93e14f33fd910655d58fab21
