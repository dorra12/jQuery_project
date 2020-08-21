$(function() {
    //Document loaded

    //list of actors
    const actors = [{
            category: "male",
            name: "magnus jensen",
            picture: "https://randomuser.me/api/portraits/men/29.jpg"
        },
        {
            category: "male",
            name: "richard bradley",
            picture: "https://randomuser.me/api/portraits/men/95.jpg"
        },
        {
            category: "male",
            name: "eduardo martin",
            picture: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
            category: "female",
            name: "norah faure",
            picture: "https://randomuser.me/api/portraits/women/11.jpg"
        },
        {
            category: "female",
            name: "rose clarke",
            picture: "https://randomuser.me/api/portraits/women/28.jpg"
        },
        {
            category: "female",
            name: "adeline mathieu",
            picture: "https://randomuser.me/api/portraits/women/6.jpg"
        },
        {
            category: "baby",
            name: "joe edwards",
            picture: "https://randomuser.me/api/portraits/lego/5.jpg"
        },
        {
            category: "baby",
            name: "bob kelley",
            picture: "https://randomuser.me/api/portraits/lego/2.jpg"
        },
        {
            category: "baby",
            name: "john doe",
            picture: "https://randomuser.me/api/portraits/lego/1.jpg"
        }
    ];

    //create a card
    for (const actor of actors) {
        const newCard = $(".d-none").clone();

        newCard.find(".card-title").text(actor.name);

        newCard.find(".card-img-top").attr("src", actor.picture);

        newCard.addClass(actor.category).removeClass("d-none");
        $(newCard).appendTo($(".card-columns"));

        //add all the actors to the <select> form
        const newOption = $("#defaultOption").clone();
        newOption.text(actor.name);
        newOption.val(actor.name);
        newOption;
        newOption.removeAttr("disabled");
        newOption.removeAttr("id");
        newOption.appendTo(".actorsOptions");
    }
    //Category Selection By default, only the Male are visible
    $(".baby, .female").hide();

    $("input[type=radio]").on("change", function() {
        const theChoiseVal = $("input[type=radio]:checked").val();
        console.log(theChoiseVal);
        if (theChoiseVal === "male") {
            $(".card.male").show();
            $(".card.baby, .card.female").hide();
            $(".categoryOptions").val("1");
        }
        if (theChoiseVal === "female") {
            $(".card.female").show();
            $(".card.male, .card.baby").hide();
            $(".categoryOptions").val("2");
        }
        if (theChoiseVal === "baby") {
            $(".card.baby").show();
            $(".card.female, .card.male").hide();
            $(".categoryOptions").val("3");
        }
    });
    // attach a click event on each of the ".card"
    $(".card").on("click", function() {
        //reset all the card by removing the class("bg-primary text-white")
        $(".card").removeClass("bg-primary text-white");
        //make a visual feed back to the use byu adding this two class to the clicked element (this)
        $(this).addClass("bg-primary text-white");
        //Get the actor name from its h5 text
        const actorName = $(this)
            .find("h5")
            .text();
        console.log(actorName);
        //Set the form select to the correct value.
        $(".actorsOptions").val(actorName);
    });
    $("form").on("submit", function(event) {
        event.preventDefault();

        //gather
        const companyName = $(".companyName").val();
        const email = $(".email").val();
        const actorsOptions = $(".actorsOptions").val();
        console.log(actorsOptions);
        //logic
        const nameValid = companyName.length > 4;
        const emailValid = email.indexOf("@") > 0;
        //const categoryOptionsValid = categoryOptions > 0;
        const actorsOptionsValid = actorsOptions !== 1;

        let allConditions = nameValid && emailValid && actorsOptionsValid;

        // replace the form with:
        let sendMessage = `Sorry, ${actorsOptions} is not currently available. You will be contacted as soon as possible.`;
        if (allConditions) {
            $("form").html(sendMessage);
        }
    });
}); //the end