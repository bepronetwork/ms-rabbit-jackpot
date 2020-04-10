export const GenerateLink = {

    confirmEmail: (param) => {
        return `${param[0]}confirm/${param[1]}?token=${param[2]}`;
    },
    resetPassword: (param) => {
        return `${param[0]}password/reset?token=${param[1]}&userId=${param[2]}`;
    }
}
