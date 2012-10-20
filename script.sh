#!/bin/bash
#This script is for downloading all the rss feeds for news of INDIA, International, Business, Sports.
#This script will be run with crontab. Crontab will run this script periodically with a period of half hour
#(Means All RSS feeds will be updated after each half an Hour)
rm -rf news/*
wget --proxy-user=s.rajkumar --proxy-password=pDGn237G --directory-prefix=/var/www/rsss/news http://feedproxy.google.com/oneindia-news-india
wget --proxy-user=s.rajkumar --proxy-password=pDGn237G --directory-prefix=/var/www/rsss/news http://feedproxy.google.com/oneindia-news-sports
wget --proxy-user=s.rajkumar --proxy-password=pDGn237G --directory-prefix=/var/www/rsss/news http://feedproxy.google.com/oneindia-news-international
wget --proxy-user=s.rajkumar --proxy-password=pDGn237G --directory-prefix=/var/www/rsss/news http://feedproxy.google.com/oneindia-news-business
