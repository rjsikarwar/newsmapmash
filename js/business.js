function belongs( member, array )
{
	for(q=0; q<array.length; q++)
	{
		if(array[q] == member) return 1;
	}
	return -1;
}
function initialize_business()
{	
	//var infowindow_array = new Array();
	latlng = new google.maps.LatLng(23.5, 82.5);
     	myOptions = {
     		 	zoom:4,
      			center: latlng,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		    };
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(50,50)}); 
	xmlDoc = null;
	xmlDoc2 = null;
	if(window.ActiveXObject) //for IE
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc2 = new ActiveXObject("Microsoft.XMLDOM");
	}
	else if(document.implementation.createDocument) //for Firefox
	{
		xmlDoc = document.implementation.createDocument("","",null);
		xmlDoc2 = document.implementation.createDocument("","",null);
	}
	else alert("Your browser does not support xml");
	
	if((xmlDoc != null) && (xmlDoc2 != null))
	{
		xmlDoc.async = false;
		xmlDoc.load("news/oneindia-news-business");
		xmlDoc2.async = false;
		xmlDoc2.load("xml/city_lat_lng.xml");
		items = xmlDoc.getElementsByTagName("item");
		checked_places = new Array();
		for(i=0; i<items.length; i++)
		{
			title = items[i].getElementsByTagName("title")[0].textContent;
			link = items[i].getElementsByTagName("link")[0].textContent;
			description = items[i].getElementsByTagName("description")[0].textContent;
			content = "<strong>" + title + "</strong><br/>" + description + "<a href=" + link + " target=newtab/>see more</a></br>";
			var address = "";
			var j=0;
			while(description[j] != ',')
			{
				address += description[j];
				j++;
			}
			if( belongs(address, checked_places) == 1 ) continue; 
			checked_places[checked_places.length] = address;
			for( l=i+1; l<items.length; l++ )
			{
				description1 = items[l].getElementsByTagName("description")[0].textContent;
				title1 = items[l].getElementsByTagName("title")[0].textContent;
				link1 = items[l].getElementsByTagName("link")[0].textContent;
				var m=0; 
				var address1 ="";
				while(description1[m] != ',')
				{
					address1 += description1[m];
					m++;
				}	
				
				if(address1.toLowerCase() == address.toLowerCase()){
					content += "<br/><br/><strong>" + title1 + "</strong><br/>" + description1 + "<a href=" + link1 + " target=newtab/>see more</a></br>";}
			}	
			var places = xmlDoc2.getElementsByTagName("place");
			for(k=0; k<places.length; k++)
			{
				city = places[k].getAttribute("city");
				
				if(address == city){
				var point = new google.maps.LatLng(parseFloat(places[k].getAttribute("lat")),parseFloat(places[k].getAttribute("lng")));
				var marker = new google.maps.Marker({
					position: point,
					map: map,
					title: "nath"});
				marker.html = content;
				google.maps.event.addListener(marker, 'mouseover', function() 
				{
					this.setAnimation(google.maps.Animation.BOUNCE);
					infowindow.setContent(this.html);
					infowindow.open(map,this);
				});
				google.maps.event.addListener(marker, 'mouseout', function() 
				{
					this.setAnimation(null);
				});
				break;
				}
			}
			if(k==places.length)
			{
						/*new code for geo code*/
			      
		       		 var geocoder = new google.maps.Geocoder();
		       	   	 //var address = document.getElementById("address").value;
				 geocoder.geocode( { 'address': address}, function(results, status) {
				      	if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
						    map: map,
						    position: results[0].geometry.location,
						    title: "nath"
						});
						marker.html = content;
						google.maps.event.addListener(marker, 'mouseover', function() 
						{
							this.setAnimation(google.maps.Animation.BOUNCE);
							infowindow.setContent(this.html);
							infowindow.open(map,this);
						});
						google.maps.event.addListener(marker, 'mouseout', function() 
						{
							this.setAnimation(null);
						});
				      	} 
				      	else {
						alert("Geocode was not successful for the following reason: " + status);
				      	}

				});
			
			}
		}	
	}
}
