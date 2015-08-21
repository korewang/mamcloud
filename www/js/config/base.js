define([],function() {
    var net1 = {// test
            serverEndport: "http://172.16.135.124:8080/CloudDCSP_2",//"http://113.200.74.233:8080/CloudDCSP",//
            uploadData:"http://172.16.135.124:9090",//"http://113.200.74.233:80",
            fileFullPath:"http://172.16.135.124:8080/CloudDCSP_2/ec/download",
            moveFolderPort:"http://172.16.135.124:8080/CloudDCSP_2/emc/folder/folder/"
            //http://172.16.135.124:9090/api/getfile
        },
        net2 = {//develop
            serverEndport: "http://172.16.135.124:8080/CloudDCSP",//"http://113.200.74.233:8080/CloudDCSP",//
            uploadData:"http://172.16.135.124:9090",//"http://113.200.74.233:80",
            fileFullPath:"http://172.16.135.124:8080/CloudDCSP/ec/download",
            moveFolderPort:"http://172.16.135.124:8080/CloudDCSP/emc/folder/folder/"
            //http://172.16.135.124:9090/api/getfile
        },
        net3 = {//cloud
            serverEndport: "http://113.142.30.117/CloudDCSP",
            uploadData:"http://113.142.30.117:81",
            fileFullPath:"http://113.142.30.117/CloudDCSP/ec/download",
            moveFolderPort:"http://113.142.30.117/CloudDCSP/emc/folder/folder/"
        };
	return net1;
});
