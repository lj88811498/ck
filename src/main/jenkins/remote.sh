#!/bin/bash

echo "------开始执行脚本------"

{
    docker stop nnloud-docker
    original=$(docker ps -a | grep "nnloud-docker" | awk '{print $2}')
    docker rm nnloud-docker
    echo 'nnloud-docker 原容器删除完成'
} || {
    echo 'nnloud-docker 原容器删除异常'
}

echo '-----启动新镜像-----'
docker run --restart=always -e 'SPRING_PROFILES_ACTIVE=test' -v /usr/share/zoneinfo/Asia/Shanghai:/etc/timezone:ro -v /etc/localtime:/etc/localtime:ro  -v /var/www/html/nanning:/var/www/html/nanning --name nnloud-docker -d -p 8898:8899 nncloud:2.0
if [ $? -eq 0 ]
then

    docker rmi $original
    echo '------删除原镜像成功------'
else
    echo '-----启动新镜像失败，开始回滚-----'
    docker rmi $(docker images | grep "nnloud-docker" | awk '{print $3}')
    docker tag $original nnloud:2.0
    docker run --restart=always -e 'SPRING_PROFILES_ACTIVE=test' -v /usr/share/zoneinfo/Asia/Shanghai:/etc/timezone:ro -v /etc/localtime:/etc/localtime:ro  -v /var/www/html/nanning:/var/www/html/nanning --name nnloud-docker -d -p 8898:8899 nnloud:2.0
    echo '-----回滚成功-----'
    exit 1
fi
echo '-----新镜像启动成功-----'
echo "执行成功 $original"