// Define the function at the top level
function getRecommendations() {
    const genre = $('#genre').val();
    const platform = $('#platform').val();
    console.log('Genre:', genre, 'Platform:', platform); // Debugging line

    if (!window.gameData) {
        console.error('Game data not loaded');
        return;
    }

    // Filter games based on user preferences
    const recommendations = window.gameData.filter(game =>
        game.genre === genre && game.platform === platform
    );

    console.log('Recommendations:', recommendations); // Debugging line
    displayRecommendations(recommendations);
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const recommendationsDiv = $('#recommendations');
    recommendationsDiv.empty();

    if (recommendations.length > 0) {
        recommendations.forEach(game => {
            recommendationsDiv.append(`
                <div class="recommendation-card card mb-3">
                    <div class="card-body">
                        <h3 class="card-title">${game.title}</h3>
                        <p class="card-text">${game.description}</p>
                    </div>
                </div>
            `);
        });
    } else {
        recommendationsDiv.html('<p class="text-center">No games found for your preferences.</p>');
    }
}

// Load game data from JSON file
$(document).ready(function() {
    $.getJSON('games.json')
        .done(function(data) {
            window.gameData = data;
            console.log('Game data loaded:', window.gameData); // Debugging line
        })
        .fail(function() {
            console.error('Error loading game data');
        });

    // Bind the form submission event to call getRecommendations
    $('#preferences-form').on('submit', function(e) {
        e.preventDefault();
        getRecommendations(); // Call the function to get recommendations
    });
});
