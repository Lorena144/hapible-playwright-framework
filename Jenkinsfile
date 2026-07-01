pipeline {

    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    parameters {

        choice(
            name: 'SUITE',
            choices: ['API', 'UI', 'HYBRID', 'ALL'],
            description: 'Select the test suite to execute'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select browser'
        )

        choice(
            name: 'TAG',
            choices: ['ALL', '@smoke', '@regression'],
            description: 'Select test tag'
        )
    }

    environment {
        UI_BASE_URL = credentials('UI_BASE_URL')
        API_BASE_URL = credentials('API_BASE_URL')
        USERNAME_EMPLOYER = credentials('USERNAME_EMPLOYER')
        PASSWORD_EMPLOYER = credentials('PASSWORD_EMPLOYER')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Setup Authentication') {
            when {
                anyOf {
                    expression { params.SUITE == 'UI' }
                    expression { params.SUITE == 'HYBRID' }
                    expression { params.SUITE == 'ALL' }
                }
            }
            steps {
                bat 'npm run test:setup'
            }
        }

        stage('Run Tests') {
            steps {
                script {

                    echo "======================================"
                    echo "Selected Parameters"
                    echo "SUITE   : ${params.SUITE}"
                    echo "BROWSER : ${params.BROWSER}"
                    echo "TAG     : ${params.TAG}"
                    echo "======================================"

                    def command = "npx playwright test"

                    switch(params.SUITE) {

                        case 'API':
                            command += " tests/api"
                            break

                        case 'UI':
                            command += " tests/ui"
                            break

                        case 'HYBRID':
                            command += " tests/hybrid"
                            break

                        case 'ALL':
                            break

                        default:
                            error "Unknown suite: ${params.SUITE}"
                    }

                    if (params.BROWSER != 'all') {
                        command += " --project=${params.BROWSER}"
                    }

                    if (params.TAG != 'ALL') {
                        command += " --grep ${params.TAG}"
                    }

                    echo "Running command:"
                    echo command

                    bat command
                }
            }
        }
    }

    post {

        always {

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true

            allure(
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            )
        }
    }
}