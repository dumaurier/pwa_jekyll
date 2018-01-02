FROM ubuntu

# Define the build arg and set a default value
ARG build=manual

# Create a label for version and set it to the value of $build
LABEL version=$build

# update the base image and install our required packages
RUN apt-get -y update && apt-get -y install git wget curl nodejs ruby-dev npm nginx supervisor && apt-get clean all

# install generic requirements
RUN npm install -g n && n stable && npm install -g npm && npm install -g bower gulp browser-sync && gem install bundle

# copy our application
RUN mkdir /app
COPY . /app

# configure nginx and supervisord for staging/production deployments
RUN rm -rf /etc/nginx/sites-enabled/default && cp /app/config/nginx/nginx.conf /etc/nginx/ && cp /app/config/nginx/default /etc/nginx/sites-available/ && ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default && cp /app/config/supervisor/supervisord.conf /etc/supervisor/ && cp /app/config/supervisor/apps.conf /etc/supervisor/conf.d/

# install our application-specific requirements
RUN cd /app && bundle install

# configure and launch the application
EXPOSE 80 3002 4002
VOLUME /app

WORKDIR /app

ENTRYPOINT ./docker-entrypoint.sh
