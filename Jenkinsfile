pipeline {
    agent any

    environment {
        DOCKER_NETWORK = 'sl-network'
        DATABASE_URL = 'postgresql://admin:admin123@db:5432/shopping_list_db?schema=public'
    }

    stages {
        stage('Setup Docker Network') {
            steps {
                script {
                    // Crear la red Docker si no existe
                    bat "docker network ls -f name=${env.DOCKER_NETWORK} -q | findstr . > nul || docker network create ${env.DOCKER_NETWORK}"
                }
            }
        }

        stage('Deploy PostgreSQL') {
            steps {
                script {
                    // Deploy PostgreSQL container
                    bat """
                    docker-compose -f docker-compose.yml up -d db
                    """
                }
            }
        }

        stage('Deploy pgAdmin') {
            steps {
                script {
                    // Deploy pgAdmin container
                    bat """
                    docker-compose -f docker-compose.yml up -d pgadmin
                    """
                }
            }
        }

        stage('Deploy App') {
            steps {
                script {
                    // Deploy App container with DATABASE_URL environment variable
                    bat """
                    docker-compose -f docker-compose.yml up -d app
                    """
                }
            }
        }

        stage('Check Deployment') {
            steps {
                script {
                    // Verificar que los contenedores estén corriendo
                    bat """
                    docker-compose -f docker-compose.yml ps
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Mensaje de despliegue completado
                bat """
                echo 'Despliegue completado. Verifica los contenedores en Docker.'
                """
            }
        }
    }
}
