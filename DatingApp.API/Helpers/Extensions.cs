using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow_Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currPage, int itemsPerPage,
         int totalItems, int totalPages)
         {
             var pagHeader = new PaginationHeader(currPage, itemsPerPage, totalItems, totalPages);
             response.Headers.Add("Pagination", JsonConvert.SerializeObject(pagHeader));
                 response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
         }

        public static int CalcAge(this DateTime theDT)
        {
            var age = DateTime.Today.Year - theDT.Year;
            if(theDT.AddYears(age) > DateTime.Today)
            {
                age--;
            }

            return age;
        }
    }
}