<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable {
    use Queueable, SerializesModels;

    public $url;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($url) {
        //
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
        // return (new MailMessage)
        //     ->from('no-reply@kulfizz.com', 'Kulfizz')
        //     ->subject(Lang::getFromJson('Verify Email Address'))
        //     ->line(Lang::getFromJson('Please click the button below to verify your email address.'))
        //     ->action(Lang::getFromJson('Verify Email Address'), $this->url)
        //     ->line(Lang::getFromJson('If you did not create an account, no further action is required.'));
        return $this->from('no-reply@kulfiz.com', 'Kulfizz')
            ->subject('Verify Email Address')->view('email.verifyemail');
    }
}
