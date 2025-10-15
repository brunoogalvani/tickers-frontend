export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            color: {
                'light-background': '#FFFBF5',    // Um branco levemente acinzentado, confortável para os olhos
                'light-surface': '#FFFFFF',       // Cards e header brancos para um look clean
                'light-primary': '#FF7A59',       // Laranja pêssego vibrante para botões e destaques
                'light-secondary': '#FFD6C9',   // Tom de pêssego bem claro para sombras e hovers
                'light-text-main': '#2D2D2D',      // Preto suave, quase grafite, para alta legibilidade
                'light-text-muted': '#757575', 
            fontFamily: {
                poppin: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                openSans: ['Open Sans', 'sans-serif'],
            },
        },
    },
},
    plugins: [],
}