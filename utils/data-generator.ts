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
        return `Job_Title_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }

    static jobDescription() {
        return `Job_Description_${this.timestamp}_${Math.floor(Math.random() * 1000)}`;
    }
}