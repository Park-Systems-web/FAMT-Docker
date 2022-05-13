pipeline {
    agent any
    tools {
        nodejs "NodeJS 16.14.2"
    }
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

    }
}
