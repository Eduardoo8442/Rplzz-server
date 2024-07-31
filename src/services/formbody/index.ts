import { FastifyInstance } from "fastify";
class FormBody {
    static initFormBody(instance: FastifyInstance): void {
        instance.register(require('@fastify/formbody'));
    }
}
export default FormBody;