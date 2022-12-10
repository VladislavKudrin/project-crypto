export interface CardanoWallet {
    name: "nami" | "flint",
    api: any
}

export interface CardanoWalletBalance {
    coins: string,
    multiassets: any
}