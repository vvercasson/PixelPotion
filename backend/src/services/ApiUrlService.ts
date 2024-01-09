export class ApiUrlService {
    private static readonly BASE_URL: string = "https://www.thecocktaildb.com/api/json/v1/1";

    public static readonly SEARCH_BY_NAME: string = this.BASE_URL + "/search.php?s=";
    public static readonly SEARCH_BY_FIRST_LETTER: string = this.BASE_URL + "/search.php?f=";
    public static readonly SEARCH_BY_INGREDIENT: string = this.BASE_URL + "/filter.php?i=";
    public static readonly SEARCH_BY_ID: string = this.BASE_URL + "/lookup.php?i=";
    public static readonly RANDOM: string = this.BASE_URL + "/random.php";
}