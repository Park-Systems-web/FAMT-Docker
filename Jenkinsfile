pipeline {
    agent any
    stages {
        stage('prepare') {
            steps {
                echo 'prepare'
                 git branch: "main", credentialsId: "famt-git-credential", url: 'https://github.com/Park-Systems-web/FAMT-Docker.git'
                 sh  'ls -al'
            }
        }
        stage('client-deploy') {
            steps {
                    dir('client'){
                        sh '''
                        ls -al
                        sudo docker build -f Dockerfile -t client .
                        sudo docker container stop client
                        sudo docker container rm client
                        sudo docker run --name client -d -p 81:80 client
                        '''
                }
            }
        }
        stage('server-deploy') {
            steps {
                    dir('server'){
                     sh '''
                     ls -al
                     
                     '''
                    }
            }
        }
        stage('cleanup') {
            steps {
              sh '''
              sudo docker rmi $(sudo docker images -f "dangling=true" -q)
              '''
            }
        }

    }
}
