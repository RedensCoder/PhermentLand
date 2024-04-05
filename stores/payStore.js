import { defineStore } from "pinia";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const url = "https://phermentland.online"
const localUrl = "http://localhost:8080"

export const usePayStore = defineStore("pay", {
    state: () => { return { items: [] } },
    actions: {
        async CreatePayment(data, email, price) {
            const req = await axios.post(`${url}/createOrder`, {
                items: this.items,
                summ: price,
                data: data,
                email: email
            });

            return req.data;
        },
        async Signup(nickname, mail, password) {
            try {
                const req = await axios.post(`${localUrl}/user/create`, {
                    nickname: nickname,
                    password: password,
                    mail: mail
                })

                localStorage.setItem("token", req.data);
            } catch (e) {
                alert("Такой пользователь или почта уже есть!");
            }
        },
        async Signin(nickname, password) {
            try {
                const req = await axios.post(`${localUrl}/user/auth`, {
                    nickname: nickname,
                    password: password
                })

                localStorage.setItem("token", req.data);

                const jwt = jwtDecode(req.data);

                const user = await axios.get(`${localUrl}/user/getById/${jwt.data.id}`, {
                    headers: {
                        Authorization: req.data
                    }
                })

                sessionStorage.setItem("user", JSON.stringify(user.data));
            } catch (e) {
                alert("Пользователь не зарегистрирован!");
            }
        },
        async GetUser() {
            const jwt = jwtDecode(localStorage.getItem("token"));

            const user = await axios.get(`${localUrl}/user/getById/${jwt.data.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })

            return user.data;
        },
        async GetProducts() {
            const products = await axios.get(`${localUrl}/products/getAll`)

            return products.data;
        }
    }
});