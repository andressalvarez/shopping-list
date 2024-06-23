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
        stage('Download and Start PostgreSQL Container') {
            steps {
                script {
                    // Pull the latest PostgreSQL container
                    sh 'docker pull ${POSTGRES_CONTAINER}'
                    
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
        
        stage('Download and Start pgAdmin Container') {
            steps {
                script {
                    // Pull the latest pgAdmin container
                    sh 'docker pull ${PGADMIN_CONTAINER}'
                    
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

    post {
        always {
            script {
                // Optionally, clean up the containers after the job completes
                // sh 'docker stop postgres-container || true'
                // sh 'docker rm postgres-container || true'
                // sh 'docker stop pgadmin-container || true'
                // sh 'docker rm pgadmin-container || true'
            }
        }
    }
}
