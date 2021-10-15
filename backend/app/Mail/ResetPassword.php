<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable {
    use Queueable, SerializesModels;

    public $url;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($url) {
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
        //     ->subject(Lang::getFromJson('Reset Password Notification'))
        //     ->line(Lang::getFromJson('You are receiving this email because we received a password reset request for your account.'))
        //     ->action(Lang::getFromJson('Reset Password'), $this->url)
        //     ->line(Lang::getFromJson('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
        //     ->line(Lang::getFromJson('If you did not request a password reset, no further action is required.'));

        return $this->from('no-reply@kulfiz.com', 'Kulfizz')
            ->subject('Reset Password Notification')->view('email.resetpassword');
    }
}
