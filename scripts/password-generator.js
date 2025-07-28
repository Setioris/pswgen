/**
 * Password Generator Module
 */

document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-pw');
    const resultsContainer = document.getElementById('pw-results');

    // Character sets
    const charSets = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    // Ambiguous characters to exclude
    const ambiguousChars = 'l1Io0O';

    generateBtn.addEventListener('click', generatePasswords);

    function generatePasswords() {
        const length = parseInt(document.getElementById('pw-length').value);
        const includeLower = document.getElementById('pw-lowercase').checked;
        const includeUpper = document.getElementById('pw-uppercase').checked;
        const includeNumbers = document.getElementById('pw-numbers').checked;
        const includeSpecial = document.getElementById('pw-special').checked;
        const excludeAmbiguous = document.getElementById('pw-ambiguous').checked;
        const count = parseInt(document.getElementById('pw-count').value);

        // Validate at least one character set is selected
        if (!includeLower && !includeUpper && !includeNumbers && !includeSpecial) {
            alert('Please select at least one character type!');
            return;
        }

        // Validate length
        if (length < 4 || length > 64) {
            alert('Password length must be between 4 and 64 characters!');
            return;
        }

        // Build character pool
        let charPool = '';
        if (includeLower) charPool += charSets.lowercase;
        if (includeUpper) charPool += charSets.uppercase;
        if (includeNumbers) charPool += charSets.numbers;
        if (includeSpecial) charPool += charSets.special;

        // Remove ambiguous characters if requested
        if (excludeAmbiguous) {
            charPool = charPool.split('').filter(c => !ambiguousChars.includes(c)).join('');
        }

        // Generate passwords
        resultsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const password = generatePassword(charPool, length);
            addPasswordResult(password);
        }
    }

    function generatePassword(charPool, length) {
        let password = '';
        const poolLength = charPool.length;

        // Ensure at least one character from each selected set is included
        const selectedSets = [];
        if (document.getElementById('pw-lowercase').checked) selectedSets.push(charSets.lowercase);
        if (document.getElementById('pw-uppercase').checked) selectedSets.push(charSets.uppercase);
        if (document.getElementById('pw-numbers').checked) selectedSets.push(charSets.numbers);
        if (document.getElementById('pw-special').checked) selectedSets.push(charSets.special);

        // Add one character from each selected set first
        selectedSets.forEach(set => {
            const randomChar = set[Math.floor(Math.random() * set.length)];
            password += randomChar;
        });

        // Fill the rest with random characters from the pool
        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * poolLength);
            password += charPool[randomIndex];
        }

        // Shuffle the password to mix the guaranteed characters
        return shuffleString(password);
    }

    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    function addPasswordResult(password) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const passwordSpan = document.createElement('span');
        passwordSpan.textContent = password;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', function () {
            copyToClipboard(password);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });

        resultItem.appendChild(passwordSpan);
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