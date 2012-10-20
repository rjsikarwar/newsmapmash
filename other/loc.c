#include <stdio.h>
//#include <math.h>
//#include <string.h>
//#include <conio.h>
/*char * ftos(float num)
{
   	float pi = 3.141596;
   	char halfpie[80];
   	pi/=2;

   	sprintf(halfpie, "%f", pi);
    printf("Here is the result: %s\n", halfpie);
  	 return 0;
}

*/
char * stringtonum(char * ch)
	
{	int i=0;
	double num=0;
	int l=strlen(ch);
	while(i<l)
	{
	int g=l-i-1;
	num+=( (ch[i++]-48)*pow(10,g));
	}
	num=(double)num/60.00;
	//printf("\n%lf\niniiiiiiiiiyjuky",num);
	char  half[90];
        sprintf(half, "%f", num);
	//printf("rtrtrtr%s\n",half);
	return half;
}



int main()
{	int i=0;
	//char lat,*lon,*city;
	FILE *f1 = fopen("locate.xml", "r");
	FILE *f2 = fopen("locate1.xml", "w");
	//char line[128];
	//fgets(line,128,f1);
while(!feof(f1))
	{//printf("indian");
	 //i++;
	i=0;
	char line[128];
	fgets(line,126,f1);

	//printf("%c\nprinting line character\n",line[2]);
	char lat[45],lon[45],city[60];
	
	int k=1;
        while((int)line[i]>=48&&(int)line[i]<=57)
	lat[k++]=line[i++];
	lat[k]='.';
	i++;
	//printf("%c\n",line[i]);
	int j=0;char min[25];
	while((int)line[i]>=48&&(int)line[i]<=57)
		min[j++]=line[i++];
	min[j]='\0';
	printf("%smin here\n",min);
	char *con;
	con=stringtonum(min);
	//printf("\n%s",lat);
	i+=3;
			//printf("true%c%d",line[i+2],i);
	if(line[i]=='N'){
		lat[0]='+';
		printf("true");}
	else if(line[i]=='S'){
		lat[0]='-';
		printf("true");}
	//lat[0]='w';
	lat[++k]='\0';
	int h=0;
	char ct1[25];
	while(h+1<strlen(con))
	{ct1[h]=con[h+2];
	h++;}ct1[h]='\0';
	strcat(lat,ct1);
	printf("\n%s",lat);
	k=1;
	while(line[i++]==' ');
			printf("\nfalse%c",line[i+2]);
	i+=2;
	while((int)line[i]>=48&&(int)line[i]<=57)
	lon[k++]=line[i++];
	lon[k]='.';
	i++;
	 j=0;char mint[25];
	while((int)line[i]>=48&&(int)line[i]<=57)
		mint[j++]=line[i++];
		mint[j]='\0';
	printf("\n%smint here\n",mint );
	char *cont;
	cont=stringtonum(mint);
	while(line[i]!='E'&&line[i]!='W')
	i++;
			printf("subday\n%c",line[i+2]);
	if(line[i]=='E')
		lon[0]='+';
	else if(line[i]=='W')
		lon[0]='-';
	lon[++k]='\0';

	int h1=0;
	char ct2[25];
	while(h1+1<strlen(cont))
	{ct2[h1]=cont[h1+2];
	h1++;}ct2[h1]='\0';
	
	strcat(lon,ct2);
	i+=2;
	//lon[0]='w';//////////////////
	printf("%slonitude\n",lon);
	while(line[i++]==' ');
	int p=0;
	i--;
	printf("\n123%c123",line[i]);
	i+=1;
	while(line[i]!=','&&(line[i]!=' '&&line[i+1]!=' '))
	{
	city[p++]=line[i++];
	}
	city[p++]=line[i];
	
	i++;
	if(line[i]==' ')
		{city[p++]=line[i];i++;}// while(!(line[i]>=65&&line[i]<=90))i++;}
	while(line[i]!=' '&&line[i]!='\t')
	city[p++]=line[i++];
	city[p]='\0';	
	printf("\ncity%s\n%d\n",city,p);
	fprintf(f2,"<marker city=\"%s\" lat=\"%s\" lng=\"%s\"> \n",city,lat,lon);
	//fgets(line,128,f1);
	}//end of reading the file
	fclose(f1);
	fclose(f2);
return 0;
}