export class DataGenerator {

    static timestamp = Date.now();

    static username() {
        return `username_${this.timestamp}`;
    }

    static email() {
        return `test_${this.timestamp}@mail.com`;
    }

    static password() {
        return `SecretPass_${this.timestamp}`;
    }

    static jobTitle() {
        return `Job_Title_${this.timestamp}`;
    }

    static jobDesription() {
        return `Job_Description_${this.timestamp}`;
    }
}