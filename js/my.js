var client = new WindowsAzure.MobileServiceClient(
    "https://testhtmlms.azure-mobile.net/",
    "sSFpLGkvOfebwDkIkgDsqtZLHclniD45"
);
var item = { text: "Awesome item" };
client.getTable("Item").insert(item);
