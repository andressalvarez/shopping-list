pipeline {
    agent any

    environment {
        POSTGRES_CONTAINER = 'postgres:latest'
        PGADMIN_CONTAINER = 'dpage/pgadmin4:latest'
        POSTGRES_DB = 'shopping_list_db'
        POSTGRES_USER = 'admin'
        POSTGRES_PASSWORD = 'admin123'
        PGADMIN_DEFAULT_EMAIL = 'admin@admin.com'
        PGADMIN_DEFAULT_PASSWORD = 'admin123'
    }

    stages {
        stage('Start PostgreSQL Container') {
            steps {
                script {
                    // Stop and remove any existing PostgreSQL container
                    sh 'docker stop postgres-container || true'
                    sh 'docker rm postgres-container || true'
                    
                    // Start a new PostgreSQL container
                    sh """
                    docker run -d --name postgres-container \\
                        -e POSTGRES_DB=${POSTGRES_DB} \\
                        -e POSTGRES_USER=${POSTGRES_USER} \\
                        -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \\
                        -p 5432:5432 \\
                        ${POSTGRES_CONTAINER}
                    """
                }
            }
        }
        
        stage('Start pgAdmin Container') {
            steps {
                script {
                    // Stop and remove any existing pgAdmin container
                    sh 'docker stop pgadmin-container || true'
                    sh 'docker rm pgadmin-container || true'
                    
                    // Start a new pgAdmin container
                    sh """
                    docker run -d --name pgadmin-container \\
                        -e PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL} \\
                        -e PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD} \\
                        -p 80:80 \\
                        ${PGADMIN_CONTAINER}
                    """
                }
            }
        }
    }

}
