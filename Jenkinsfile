pipeline {
    agent any

    environment {
        POSTGRES_CONTAINER = 'postgres:latest'
        PGADMIN_CONTAINER = 'dpage/pgadmin4:latest'
        PGADMIN_PORT = '5050'
        POSTGRES_DB = 'shopping_list_db'
        POSTGRES_USER = 'admin'
        POSTGRES_PASSWORD = 'admin123'
        PGADMIN_DEFAULT_EMAIL = 'admin@admin.com'
        PGADMIN_DEFAULT_PASSWORD = 'admin123'
        DOCKER_NETWORK = 'shopping-list-network' // Nombre de la red Docker personalizada
    }

    stages {
        stage('Setup Docker Network') {
            steps {
                script {
                    // Crear una red Docker personalizada si no existe
                    bat "docker network ls -f name=${env.DOCKER_NETWORK} -q | findstr . > nul || docker network create ${env.DOCKER_NETWORK}"
                }
            }
        }

        stage('Download and Start PostgreSQL Container') {
            steps {
                script {
                    // Pull the latest PostgreSQL container
                    bat 'docker pull %POSTGRES_CONTAINER%'

                    // Stop and remove any existing PostgreSQL container
                    bat '''
                    docker stop postgres-container || exit 0
                    docker rm postgres-container || exit 0
                    '''

                    // Start a new PostgreSQL container in the created network
                    bat """
                    docker run -d --name postgres-container ^
                        --network ${env.DOCKER_NETWORK} ^
                        -e POSTGRES_DB=${env.POSTGRES_DB} ^
                        -e POSTGRES_USER=${env.POSTGRES_USER} ^
                        -e POSTGRES_PASSWORD=${env.POSTGRES_PASSWORD} ^
                        -p 5432:5432 ^
                        %POSTGRES_CONTAINER%
                    """
                }
            }
        }

       stage('Download and Start pgAdmin Container') {
            steps {
                script {
                    // Pull the latest pgAdmin container
                    bat "docker pull ${env.PGADMIN_CONTAINER}"

                    // Stop and remove any existing pgAdmin container
                    bat "docker stop pgadmin-container || true"
                    bat "docker rm pgadmin-container || true"

                    // Start a new pgAdmin container in the created network
                    bat """
                    docker run -d --name pgadmin-container ^
                        --network ${env.DOCKER_NETWORK} ^
                        -e PGADMIN_DEFAULT_EMAIL=${env.PGADMIN_DEFAULT_EMAIL} ^
                        -e PGADMIN_DEFAULT_PASSWORD=${env.PGADMIN_DEFAULT_PASSWORD} ^
                        -p ${env.PGADMIN_PORT}:80 ^
                        ${env.PGADMIN_CONTAINER}
                    """
                }
            }
        }
    }
}
