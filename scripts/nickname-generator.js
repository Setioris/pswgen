/**
 * Nickname Generator Module
 */

document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-nick');
    const resultsContainer = document.getElementById('nick-results');

    // Nickname parts by style
    const nicknameParts = {
        fantasy: {
            prefixes: ['Shadow', 'Dark', 'Mystic', 'Silver', 'Dragon', 'Storm', 'Iron', 'Night', 'Blood', 'Frost'],
            suffixes: ['blade', 'fang', 'heart', 'wing', 'born', 'fire', 'bane', 'whisper', 'seeker', 'weaver'],
            connectors: ['-', '_', '', '~', '.']
        },
        tech: {
            prefixes: ['Cyber', 'Neon', 'Quantum', 'Digital', 'Virtual', 'Nano', 'Hyper', 'Mega', 'Ultra', 'X'],
            suffixes: ['byte', 'bit', 'code', 'hack', 'node', 'core', 'drive', 'link', 'matrix', 'net'],
            connectors: ['-', '_', '', '.', '~']
        },
        cute: {
            prefixes: ['Bunny', 'Kitty', 'Panda', 'Puppy', 'Sweet', 'Fluffy', 'Sugar', 'Berry', 'Candy', 'Honey'],
            suffixes: ['pie', 'pop', 'kins', 'cake', 'muffin', 'bun', 'bean', 'bug', 'boo', 'blossom'],
            connectors: ['-', '_', '', '~', '^']
        },
        cool: {
            prefixes: ['Ice', 'Phantom', 'Ghost', 'Steel', 'Rogue', 'Viper', 'Wolf', 'Hawk', 'Blaze', 'Thunder'],
            suffixes: ['storm', 'strike', 'shot', 'claw', 'fang', 'blade', 'rage', 'king', 'master', 'rider'],
            connectors: ['-', '_', '', '.', '~']
        },
        gamer: {
            prefixes: ['Pro', 'Elite', 'Noob', '1337', 'xXx', 'MLG', 'Frag', 'Pwn', 'GG', 'L33T'],
            suffixes: ['Slayer', 'Killer', 'Gamer', 'Player', 'Master', 'Lord', 'Ninja', 'Bot', 'Noob', 'Pro'],
            connectors: ['', '_', '-', 'x', 'X']
        },
        random: {
            prefixes: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gold', 'Silver', 'Purple', 'Orange'],
            suffixes: ['fox', 'wolf', 'bear', 'eagle', 'lion', 'tiger', 'hawk', 'raven', 'owl', 'snake'],
            connectors: ['-', '_', '', '.', '~']
        }
    };

    // Length constraints
    const lengthConstraints = {
        short: { min: 3, max: 5 },
        medium: { min: 6, max: 8 },
        long: { min: 9, max: 12 },
        random: { min: 3, max: 12 }
    };

    generateBtn.addEventListener('click', generateNicknames);

    function generateNicknames() {
        const lengthType = document.getElementById('nick-length').value;
        const style = document.getElementById('nick-style').value;
        const count = parseInt(document.getElementById('nick-count').value);

        // Validate count
        if (count < 1 || count > 10) {
            alert('Please select between 1 and 10 nicknames!');
            return;
        }

        // Generate nicknames
        resultsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const nickname = generateNickname(lengthType, style);
            addNicknameResult(nickname);
        }
    }

    function generateNickname(lengthType, style) {
        const constraints = lengthConstraints[lengthType];
        const targetLength = Math.floor(Math.random() * (constraints.max - constraints.min + 1)) + constraints.min;

        // Get the style parts (or random if style is random)
        const parts = style === 'random' ?
            getRandomStyleParts() :
            nicknameParts[style];

        // Generate nickname components
        const prefix = parts.prefixes[Math.floor(Math.random() * parts.prefixes.length)];
        const suffix = parts.suffixes[Math.floor(Math.random() * parts.suffixes.length)];
        const connector = parts.connectors[Math.floor(Math.random() * parts.connectors.length)];

        // Combine components
        let nickname = prefix + connector + suffix;

        // Adjust length if needed
        if (nickname.length > targetLength) {
            nickname = nickname.substring(0, targetLength);
        } else if (nickname.length < targetLength) {
            // Add random characters if too short
            const extraChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            while (nickname.length < targetLength) {
                nickname += extraChars[Math.floor(Math.random() * extraChars.length)];
            }
        }

        return nickname;
    }

    function getRandomStyleParts() {
        // Get a random style that's not 'random'
        const styles = Object.keys(nicknameParts).filter(s => s !== 'random');
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        return nicknameParts[randomStyle];
    }

    function addNicknameResult(nickname) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const nicknameSpan = document.createElement('span');
        nicknameSpan.textContent = nickname;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', function () {
            copyToClipboard(nickname);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });

        resultItem.appendChild(nicknameSpan);
        resultItem.appendChild(copyBtn);
        resultsContainer.appendChild(resultItem);
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
});