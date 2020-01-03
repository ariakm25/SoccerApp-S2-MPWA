document.addEventListener("DOMContentLoaded", function() {
  function showAllFavourite() {
    dbGetAllFavourites().then(favourites => {
      let listFavouritesInText = "";
      favourites.forEach(fav => {
        listFavouritesInText += `
            <tr>
              <td class="valign-wrapper">
                <img src="${fav.teamImage}" class="img-responsive circle mr-2" width="50px" height="50px"> ${fav.teamName}
              </td>
              <td class="center">
              <a class="white-text" href="detail.html?id=${fav.teamId}"><button class="waves-effect waves-light btn"><i class="material-icons">remove_red_eye</i></button></a>
                <button id="${fav.favId}" class="waves-effect waves-light btn pink removeButton"><i class="material-icons" id="${fav.favId}">clear</i></button>
              </td>
            </tr>
            `;
      });
      document.getElementById("teams").innerHTML = listFavouritesInText;

      let removeButtons = document.querySelectorAll(".removeButton");
      for (let button of removeButtons) {
        button.addEventListener("click", function(event) {
          let favId = event.target.id;
          dbDeleteFavourite(favId).then(() => {
            showAllFavourite();
          });
        });
      }
    });
  }

  showAllFavourite();
});
