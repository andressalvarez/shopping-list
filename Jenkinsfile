pipeline {
    agent any

    environment {
        DOCKER_NETWORK = 'sl-network'
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
                    // Deploy App container
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
                // Ejecutar migraciones de Prisma
                bat """
                docker exec -it shopping-list npx prisma migrate deploy
                """
            }
        }
    }
}
